import https from "https";
const GGM_REPO = "/repos/mozkomor/GrinGoldMiner/releases";

async function getLatestRelease() {
  const [latestRelease] = await getAllReleases();
  const { assets }: { assets: any[] } = latestRelease;

  const linuxAssets = assets.filter(
    a =>
      (a.name as string).includes("Linux") ||
      (a.name as string).includes("linux")
  );

  console.clear();
  if (linuxAssets.length === 0) {
    return console.log("no latest linux asset found");
  }
  if (linuxAssets.length > 1) {
    return console.log("multiple linux assets found");
  }
  return console.log(
    `curl -L ${linuxAssets[0].browser_download_url} | tar -xz`
  );
}

getLatestRelease();

function getAllReleases(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      {
        hostname: "api.github.com",
        port: 443,
        headers: {
          "User-Agent": "henrynguyen5"
        },
        path: GGM_REPO
      },
      res => {
        let data = "";
        res.on("data", chunk => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
          req.end();
        });
      }
    );

    req.on("error", e => {
      reject(e);
    });
  });
}
