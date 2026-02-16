import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar,Welcome,Dock } from "#components";
import {  Contact, Finder, Resume, Safari, Terminal, Text, Image } from "#windows";
// import { Connect } from "vite";
gsap.registerPlugin(Draggable);

 const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock/>
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
    </main>
  )
};

export default App;
