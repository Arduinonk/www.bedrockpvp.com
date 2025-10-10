import { useState, type JSX } from 'react';
import { Button } from '@mui/material';
// import banner from './OldHtml/images/bannerrr.jpg';
// import cover from "./OldHtml/images/cover.png";
import youtubeLogo from './OldHtml/images/youtube-logo.png'
import tiktokLogo from './OldHtml/images/tiktok-logo.png'
import discordLogo from './OldHtml/images/Discord-logo.png'
// import kristallogo0 from './OldHtml/images/Kristal Market0.png'
import kristallogo1 from './OldHtml/images/Kristal Market1.png'
// import minecraftBanner from './OldHtml/images/main_banner.png'


type useStadeType = {
  page: string,
  setPage: React.Dispatch<React.SetStateAction<string>>
};

import './App.css'
// import { red } from '@mui/material/colors';



function App(): JSX.Element {
  const [page, setPage] = useState("mainPage")

  return (
    <>
      <Header />
      {/* <Header page={page} setPage={setPage} /> */}
      <Body page={page} setPage={setPage} />
    </>
  )
}

// const Header = (args: useStadeType): JSX.Element => {
  const Header =(): JSX.Element => {
  return (
    <>
      {/* <div className="container" style={{ padding: 0 }}>
        <img
          src={banner}
          alt="Banner"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div> */}
      <div className="container mt-3" style={{
        position: "sticky",
        paddingTop: "6px",
        top: 0,
        zIndex: 2000,
        background: "#fff",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
      }}>
        {/* <HeaderMainPagesButtons page={args.page} setPage={args.setPage} /> */}
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
  )
};

// const HeaderMainPagesButtons = (args: useStadeType): JSX.Element => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container rounded" style={{ backgroundColor: "rgba(218, 218, 218, 1)" }}>
//         <a className="navbar-brand" href="#">
//           <img src={cover} alt="Logo" width="120" height="30" className="d-inline-block align-text-top" />
//         </a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon" />
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="nav nav-pills" style={{ gap: 10 }}>
//             <li className="nav-item">
//               <Button variant='contained'
//                 className="nav-link active "
//                 style={{
//                 }}
//                 onClick={() => args.setPage("mainPage")}
//               > "Ana Sayfa"</Button>
//               {/* <a className="nav-link active" aria-current="page" href="#">Ana Sayfa</a> */}
//             </li>
//             <li className="nav-item">
//               <Button variant='contained' className="nav-link" onClick={() => args.setPage("pluginsPage")}> "Bedrock Modlari"</Button>
//               {/* <a className="nav-link" href="./pages/bedrock_addons.html">Bedrock Modları</a> */}
//             </li>
//             <li className="nav-item">
//               <Button variant='contained' className="nav-link" onClick={() => args.setPage("serverPage")}> "Sunucu"</Button>
//               {/* <a className="nav-link" href="./pages/sunucu.html">Sunucu</a> */}
//             </li>
//           </ul>
//         </div>``
//       </div>
//     </nav>
//   )
// };

const Body = (args: useStadeType): JSX.Element => {

  return (
    <>
      <div>
        <div className="container mt-3">
          <div className="shadow p-5 mb-5 bg-body-tertiary rounded col-lg-12 col-md-12 col-sm-12">
            {/* {args.page === 'serverPage' && <ServerPage page="serverPage" setPage={args.setPage} />} */}
            {args.page === 'serverPage' && <ServerPage />}
            {/* {args.page === 'mainPage' && <MainPage page="mainPage" setPage={args.setPage} />} */}
            {args.page === 'mainPage' && <MainPage />}
            {args.page === 'pluginsPage' && <PluginsPage page="pluginsPage" setPage={args.setPage} />}

          </div>

          <Footer />
        </div>
      </div>
    </>
  )
};

const WelcomeComponent = (): JSX.Element => {
  return (
    <div className="">
      <div className="shadow p-2 mb-3 rounded">
        <div className="col-lg-12 align-self-center">
          <div className="caption  text-center">
            <span style={{
              fontSize: "20px",
              fontWeight: 900,
              color: '#320effff'
            }}>{""}
              <span style={{
                fontSize: "40px",
                fontWeight: 900,
                color: '#6a0effff'
              }}>BedrockPVP </span>
              sitesine hoşgeldiniz </span>
          </div>
        </div>
      </div>
    </div>
  )
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

// const WebsitePreview = (): JSX.Element => {
//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       <button
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           border: "none",
//           borderRadius: "12px",
//           background: "rgba(0,150,255,0.15)",
//           cursor: "pointer",
//         }}
//         onClick={() => window.open("https://example.com", "_blank")}
//       >
//         Kristal markete gir!
//       </button>
//     </div>
//   );
// }
const Footer = (): JSX.Element => {
  return (
    <div className="card text-center container">
      <div className="card-footer text-body-secondary">
        <span>
          Telif Hakkı ©
          <span style={{ color: "rgba(16, 204, 16, 1)" }}>2023</span>
          .{" "}
          <span style={{ color: "rgba(204, 16, 16, 1)" }}>TürkmenMiner</span>
          'a aittir. Her hakkı saklıdır.
        </span>
        <a rel="unfollow" href="https://www.youtube.com/@turkmenminer" target="_blank" > Design: NK</a>
      </div>
    </div>
  )
};
const MainPage = (): JSX.Element => {
  
  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>

      <WelcomeComponent />
      <div className="col-lg-7 col-md-7">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>Minecraft Bedrock Modları, Minecraft Bedrock Add-ons, Minecraft Bedrock Resource Packs,
            Minecraft Bedrock Video ve daha fazlası...</p>
        </div >
        <div className="shadow p-2 mb-5 rounded row  " style={{ gap: "10px" }}>
          <p style={{ color: "purple" }}> </p>
          <p style={{ color: "purple" }}> </p>
          <p style={{ color: "purple", fontSize: 50 }}>Site Tasarım aşamasında!</p>
          {/* <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("serverPage")}> "BedrockPvP.com sunucu sayfası"</Button> */}
          {/* <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("pluginsPage")}> "Minecraft Bedrock Modları, Pluginleri ve daha fazlası..."</Button> */}
        </div>

      </div>
      <div className="col-lg-5 col-md-5">
        <ImageButton />
        {/* <div className="shadow p-2 mb-5 rounded ratio ratio-16x9"> */}
        {/* <WebsitePreview /> */}
        {/* <iframe className="rounded" src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
        {/* </div> */}
        {/* <div className="shadow p-2 mb-5 rounded">
                  <a className="text-decoration-none"
                    href="https://drive.google.com/file/d/13aj-AZzmJ2aEb_Gvz6xkiKQemM3ewvps/view?usp=sharing"
                    target="_blank" rel="noopener noreferrer">
                    <img src={minecraftBanner} alt="MinecraftBedrock Final Sürümü!" width="95%"
                      style={{ alignSelf: "auto", width: "100%" }} className="rounded" />
                    <p
                      style={{ textAlign: "center", fontWeight: 1000, fontSize: "16px", color: "rgba(248, 18, 10, 0.863)", lineHeight: 1.1 }}>
                      Minecraft 1.21.70.03 Final Sürüm(APK)</p>
                  </a>
                </div> */}
      </div>

    </div>
  )
};

// const ServerPage = (args: useStadeType): JSX.Element => {
  const ServerPage = (): JSX.Element => {

  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>

      <WelcomeComponent />
      <div className="col-lg-8 col-md-8">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>Server</p>
        </div >
        <div className="shadow p-2 mb-5 rounded row  " style={{ gap: "10px" }}>
          {/* <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("mainPage")}> "Main"</Button>
          <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("pluginsPage")}> "Minecraft Bedrock Modları, Pluginleri ve daha fazlası..."</Button> */}
        </div>

      </div>
      <div className="col-lg-4 col-md-4">
        <div className="shadow p-2 mb-5 rounded ratio ratio-16x9">
          <iframe className="rounded" src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        {/* <div className="shadow p-2 mb-5 rounded">
                  <a className="text-decoration-none"
                    href="https://drive.google.com/file/d/13aj-AZzmJ2aEb_Gvz6xkiKQemM3ewvps/view?usp=sharing"
                    target="_blank" rel="noopener noreferrer">
                    <img src={minecraftBanner} alt="MinecraftBedrock Final Sürümü!" width="95%"
                      style={{ alignSelf: "auto", width: "100%" }} className="rounded" />
                    <p
                      style={{ textAlign: "center", fontWeight: 1000, fontSize: "16px", color: "rgba(248, 18, 10, 0.863)", lineHeight: 1.1 }}>
                      Minecraft 1.21.70.03 Final Sürüm(APK)</p>
                  </a>
                </div> */}
      </div>

    </div>
  )
};

const PluginsPage = (args: useStadeType): JSX.Element => {

  return (
    <div className="row rounded p-2 col-lg-12 col-md-12 col-sm-12 " style={{ backgroundColor: "rgb(255, 255, 255)" }}>

      <WelcomeComponent />
      <div className="col-lg-8 col-md-8">
        <div className="shadow p-2 mb-2 rounded ">
          <p style={{ color: "purple" }}>Plugins</p>
        </div >
        <div className="shadow p-2 mb-5 rounded row  " style={{ gap: "10px" }}>
          <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("serverPage")}> "BedrockPvP.com sunucu sayfası"</Button>
          <Button style={{ background: "#234521" }} variant='contained' onClick={() => args.setPage("mainPage")}> "Main"</Button>
        </div>

      </div>
      <div className="col-lg-4 col-md-4">
        <div className="shadow p-2 mb-5 rounded ratio ratio-16x9">
          <iframe className="rounded" src="https://www.youtube.com/embed/tkgIB-w4XRw?si=g0bg0IIP6dhnTwlN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        {/* <div className="shadow p-2 mb-5 rounded">
                  <a className="text-decoration-none"
                    href="https://drive.google.com/file/d/13aj-AZzmJ2aEb_Gvz6xkiKQemM3ewvps/view?usp=sharing"
                    target="_blank" rel="noopener noreferrer">
                    <img src={minecraftBanner} alt="MinecraftBedrock Final Sürümü!" width="95%"
                      style={{ alignSelf: "auto", width: "100%" }} className="rounded" />
                    <p
                      style={{ textAlign: "center", fontWeight: 1000, fontSize: "16px", color: "rgba(248, 18, 10, 0.863)", lineHeight: 1.1 }}>
                      Minecraft 1.21.70.03 Final Sürüm(APK)</p>
                  </a>
                </div> */}
      </div>

    </div>
  )
};
export default App;
