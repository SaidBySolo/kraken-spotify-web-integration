# Kraken Spotify Web Integration

The Kraken (non-Elite models) LCD display shows the album cover of the song currently playing on Spotify.

![image](./docs/applied.png)

## Setup

1. Open [NZXT CAM](https://nzxt.com/software/cam)
2. Lighting -> LCD Display -> Web Integration
3. Custom Web Integration -> Paste [https://kraken.solo.moe](https://kraken.solo.moe) -> Apply
4. Configure -> Login Spotify -> Refreah -> Add as Card
5. Enjoy!

## Self Hosting

You need to change the following items in [App.tsx](./src/App.tsx):

```tsx
const clientId = '<YOUR_CLIENT_ID>';
const redirectUri = 'http://localhost:5173';
```
