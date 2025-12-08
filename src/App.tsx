// src/App.tsx
import React, { useState, type JSX } from "react";
import { Button } from "@mui/material";

import youtubeLogo from "./OldHtml/images/youtube-logo.png";
import tiktokLogo from "./OldHtml/images/tiktok-logo.png";
import discordLogo from "./OldHtml/images/Discord-logo.png";
import kristallogo1 from "./OldHtml/images/Kristal Market1.png";

import "./App.css";
import McFeed from "./McFeed";

type PageProps = {
  page?: string;
  setPage?: React.Dispatch<React.SetStateAction<string>>;
};

function App(): JSX.Element {
  const [page, setPage] = useState<string>("mainPage");

  return (
    <>
      <Header />
      <Body page={page} setPage={setPage} />
    </>
  );
}

const Header = (): JSX.Element => {
  return (
    <>
      <div
        className="container mt-3"
        style={{
          position: "sticky",
          paddingTop: "6px",
          top: 0,
          zIndex: 2000,
          background: "#fff",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        <HeaderSocial />
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
  );
};

const Body = ({ page, setPage }: PageProps): JSX.Element => {
  return (
    <div>
      <div className="container mt-3">
        <div className="shadow p-5 mb-5 bg-body-tertiary rounded col-lg-12 col-md-12 col-sm-12">
          {page === "serverPage" && <ServerPage />}
          {page === "mainPage" && <MainPage setPage={setPage} />}
          {page === "pluginsPage" && <PluginsPage setPage={setPage} />}
        </div>

        <Footer />
      </div>
    </div>
  );
};

const WelcomeComponent = (): JSX.Element => {
  return (
    <div className="">
      <div className="shadow p-2 mb-3 rounded">
        <div className="col-lg-12 align-self-center">
          <div className="caption  text-center">
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: "#320effff",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: 900,
                  color: "#6a0effff",
                }}
              >
                BedrockPVP{" "}
              </span>
              sitesine hoşgeldiniz
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ImageButton() {
  return (
    <img
      src={kristallogo1}
      alt="Kristal Markete git!"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onClick={() => window.open("https://www.shopier.com/TurkmenMiner")}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
  );
}

const Footer = (): JSX.Element => {
  return (
    <div className="card text-center container">
      <div className="card-footer text-body-secondary">
        <span>
          Telif Hakkı ©
          <span style={{ color: "rgba(16, 204, 16, 1)" }}>2023</span>.{" "}
          <span style={{ color: "rgba(204, 16, 16, 1)" }}>TürkmenMiner</span>'a aittir. Her hakkı saklıdır.
        </span>
        <a rel="unfollow" href="https://www.youtube.com/@turkmenminer" target="_blank">
          {" "}
          Design: NK
        </a>
      </div>
    </div>
  );
};

const MainPage = ({ setPage }: PageProps): JSX.Element => {
  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <WelcomeComponent />
      <div className="col-lg-7 col-md-7">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>
            Minecraft Bedrock Modları, Minecraft Bedrock Add-ons, Minecraft Bedrock Resource Packs, Minecraft Bedrock Video ve daha
            fazlası...
          </p>
        </div>
        <div className="shadow p-2 mb-5 rounded row  " style={{ gap: "10px" }}>
          <p style={{ color: "purple" }}> </p>
          <p style={{ color: "purple" }}> </p>
          <p style={{ color: "purple", fontSize: 50 }}>Site Tasarım aşamasında!</p>
          <Button style={{ background: "#234521" }} variant="contained" onClick={() => setPage?.("serverPage")}>
            BedrockPvP.com sunucu sayfası
          </Button>
          <Button style={{ background: "#234521", marginLeft: 8 }} variant="contained" onClick={() => setPage?.("pluginsPage")}>
            Minecraft Bedrock Modları, Pluginleri ve daha fazlası...
          </Button>
        </div>
      </div>
      <div className="col-lg-5 col-md-5">
        <ImageButton />
      </div>
    </div>
  );
};

const ServerPage = (): JSX.Element => {
  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <WelcomeComponent />
      <div className="col-lg-8 col-md-8">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>Server</p>
        </div>
        <div className="shadow p-2 mb-5 rounded row" style={{ gap: "10px" }}></div>

        <div className="shadow p-2 mb-5 rounded">
          <McFeed />
        </div>
      </div>

      <div className="col-lg-4 col-md-4">
        <div className="shadow p-2 mb-5 rounded ratio ratio-16x9">
          <iframe
            className="rounded"
            src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const PluginsPage = ({ setPage }: PageProps): JSX.Element => {
  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <WelcomeComponent />
      <div className="col-lg-8 col-md-8">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>Plugins</p>
        </div>
        <div className="shadow p-2 mb-5 rounded row  " style={{ gap: "10px" }}>
          <Button style={{ background: "#234521" }} variant="contained" onClick={() => setPage?.("serverPage")}>
            BedrockPvP.com sunucu sayfası
          </Button>
          <Button style={{ background: "#234521", marginLeft: 8 }} variant="contained" onClick={() => setPage?.("mainPage")}>
            Main
          </Button>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="shadow p-2 mb-5 rounded ratio ratio-16x9">
          <iframe
            className="rounded"
            src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default App;
