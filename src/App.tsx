import type { JSX } from 'react';
import banner from './OldHtml/images/bannerrr.jpg';
import cover from "./OldHtml/images/cover.png";
import youtubeLogo from './OldHtml/images/youtube-logo.png'
import tiktokLogo from './OldHtml/images/tiktok-logo.png'
import discordLogo from './OldHtml/images/Discord-logo.png'
import minecraftBanner from './OldHtml/images/main_banner.png'


import './App.css'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Body />
    </>
  )
}

const Header = (): JSX.Element => {
  return (
    <>
      <div className="container" style={{ padding: 0 }}>
        <img
          src={banner}
          alt="Banner"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
      <div style={{ position: "sticky", top: 0, zIndex: 2000, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", }}>
        <HeaderSocial />
        <HeaderMainPagesButtons />

      </div>
    </>
  );
};

const HeaderSocial = (): JSX.Element => {
  return (
    <div style={{ background: "#222" }}>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
          <div className="container col-lg-12 text-center ">
            <div className="row">
              <div className="col">
                <a href="https://www.youtube.com/@turkmenminer" target="_blank" rel="noopener noreferrer">
                  <img src={youtubeLogo} alt="Youtube Icon image" width="90" style={{ borderRadius: 2 }} />
                </a>
              </div>
              <div className="col">
                <a href="https://www.tiktok.com/@nk90miner" target="_blank" rel="noopener noreferrer">
                  <img src={tiktokLogo} alt="Tik-Tok Icon Image" width="90" style={{ borderRadius: 2 }} />
                </a>
              </div>
              <div className="col">
                <a href="https://discord.gg/vNhAPKaYqK" target="_blank" rel="noopener noreferrer">
                  <img src={discordLogo} alt="Discord Icon Image" width="90" style={{ borderRadius: 2 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container col-lg-8 col-md col-sm-8"></div>
      </nav>
    </div>
  )
};
const HeaderMainPagesButtons = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container rounded" style={{ backgroundColor: "rgb(255, 255, 255)" }}>
        <a className="navbar-brand" href="#">
          <img src={cover} alt="Logo" width="120" height="30" className="d-inline-block align-text-top" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./pages/bedrock_addons.html">Bedrock Modları</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./pages/sunucu.html">Sunucu</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

const Body = (): JSX.Element => {
  return (
    <>
      <div>
        <div className="container mt-3">
          <div className="shadow p-5 mb-5 bg-body-tertiary rounded">
            <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12" style={{ backgroundColor: "rgb(255, 255, 255)" }}>

              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="shadow p-2 mb-3 rounded">
                  <div className="col-lg-12 align-self-center">
                    <div className="caption header-text text-center">
                      <h1>NK90Miner</h1>
                      <h3>sitesine hoşgeldiniz</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8">
                <div className="shadow p-2 mb-2 rounded">
                  <p>Minecraft Bedrock Modları, Minecraft Bedrock Add-ons, Minecraft Bedrock Resource Packs,
                    Minecraft Bedrock Video ve daha fazlası...</p>
                </div>
                <div className="shadow p-2 mb-5 rounded ratio ratio-16x9">
                  <iframe className="rounded" src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="shadow p-2 mb-5 rounded">
                  <a className="text-decoration-none"
                    href="https://drive.google.com/file/d/13aj-AZzmJ2aEb_Gvz6xkiKQemM3ewvps/view?usp=sharing"
                    target="_blank" rel="noopener noreferrer">
                    <img src={minecraftBanner} alt="MinecraftBedrock Final Sürümü!" width="95%"
                      style={{ alignSelf: "auto", width: "100%" }} className="rounded" />
                    <p
                      style={{ textAlign: "center", fontWeight: 1000, fontSize: "16px", color: "rgba(248, 18, 10, 0.863)", lineHeight: 1.1 }}>
                      Minecraft 1.21.70.03 Final Sürüm(APK)</p>
                  </a>
                </div>
              </div>

            </div>

          </div>

          <Footer />
        </div>
      </div>
    </>
  )
};

const Footer = (): JSX.Element => {
  return (
    <div className="card text-center container">
      <div className="card-footer text-body-secondary">
        Telif Hakkı © 2023 NK90Miner'a aittir. Her hakkı saklıdır.
        <a rel="unfollow" href="https://www.youtube.com/@turkmenminer" target="_blank" >Design: NK</a>
      </div>
    </div>
  )
}
export default App;
