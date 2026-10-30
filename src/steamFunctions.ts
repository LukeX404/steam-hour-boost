import SteamUser from 'steam-user';
import SteamTotp from 'steam-totp';
import axios from 'axios';
import { Account } from './types';

async function getGameName(appId: number): Promise<string> {
  try {
    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appId}`, {
      timeout: 5000,
    });
    const data = response.data;
    if (data?.[appId]?.success && data[appId].data?.name) {
      return data[appId].data.name;
    }
  } catch {
    // If request fails (e.g. rate limit, offline, unknown appId), fallback gracefully
  }
  return 'Unknown Game';
}

export function login(account: Account): SteamUser {
  const steamUser = new SteamUser();

  const logOnOptions: Parameters<SteamUser['logOn']>[0] = {
    accountName: account.username,
    password: account.password,
  };

  if (account.sharedSecret && account.sharedSecret.trim() !== '') {
    logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret.trim());
  }

  steamUser.logOn(logOnOptions);

  steamUser.on('error', (error) => {
    console.error(`🔴 Error logging in to Steam account ${account.username}:`, error.message || error);
  });

  steamUser.on('loggedOn', async () => {
    console.log(`🟢 Logged in to Steam account: ${account.username}`);
    steamUser.setPersona(SteamUser.EPersonaState[account.status] ?? SteamUser.EPersonaState.Online);

    if (!account.games || account.games.length === 0) {
      console.warn(`⚠️  No games configured for account ${account.username}`);
      return;
    }

    if (account.games.length > 32) {
      console.warn(`⚠️  Account ${account.username} has ${account.games.length} games. Steam only supports boosting up to 32 games at once.`);
    }

    console.log(`⏳ Fetching game names for account ${account.username}...`);
    for (const gameAppId of account.games) {
      const gameName = await getGameName(gameAppId);
      console.log(`🕹️  [${account.username}] AppID ${gameAppId}: ${gameName}`);
    }

    // Boost all games simultaneously
    steamUser.gamesPlayed(account.games);
    console.log(`🚀 [${account.username}] Successfully boosting ${account.games.length} game(s)!`);
  });

  steamUser.on('disconnected', (result, message) => {
    console.warn(`⚠️  Disconnected from Steam (${account.username}): ${message || result}`);
  });

  return steamUser;
}