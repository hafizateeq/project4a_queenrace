import React from 'react';
import './App.css';
import useWebAnimations from "@wellyshen/use-web-animations";

function App() {
  /* Background animations */
  const redQueen_alice = useWebAnimations({
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ],
    animationOptions: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      // playbackRate: 1,
      iterations: Infinity
    },
  });
  var sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  const foreground1Movement = useWebAnimations({
    keyframes:
      sceneryFrames,
    animationOptions: {
      duration: 12000,
      iterations: Infinity
    }
  })
  const foreground2Movement = useWebAnimations({
    keyframes:
      sceneryFrames,
    animationOptions: {
      duration: 12000,
      iterations: Infinity
    }
  })
  const background1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    animationOptions: {
      duration: 36000,
      iterations: Infinity
    }
  })
  const background2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    animationOptions: {
      duration: 36000,
      iterations: Infinity
    }
  })
  /* Alice tires so easily! 
    Every so many seconds, reduce their playback rate so they slow a little. 
  */
  var playbackRate_RQ = 1;
  var playbackRate_BG = 0;

  var adjustBackgroundPlayback = function () {
    if (playbackRate_RQ < .8) {
      playbackRate_BG = playbackRate_RQ / 2 * -1;
    } else if (playbackRate_RQ > 1.2) {
      playbackRate_BG = playbackRate_RQ / 2;
    } else {
      playbackRate_BG = 0;
    }
    background1Movement.getAnimation().playbackRate = playbackRate_BG;
    background2Movement.getAnimation().playbackRate = playbackRate_BG;
    foreground1Movement.getAnimation().playbackRate = playbackRate_BG;
    foreground2Movement.getAnimation().playbackRate = playbackRate_BG;
  }

  /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
  /* But if they fall under 1, the background slides backwards */
  function speedup() {
    return playbackRate_BG *= 0.9;
  }


  var goFaster = function () {
    /* But you can speed them up by giving the screen a click or a tap. */
    playbackRate_RQ *= 1.1;
    redQueen_alice.getAnimation().playbackRate = playbackRate_RQ;
    adjustBackgroundPlayback();
  }

  React.useEffect(() => {
    const getforegroundanimation = foreground1Movement.getAnimation()
    getforegroundanimation.currentTime = getforegroundanimation.effect.getTiming().duration / 2;
    const getbackgroundanimation = background1Movement.getAnimation()
    getbackgroundanimation.currentTime = getbackgroundanimation.effect.getTiming().duration / 2;
    setInterval(() => {
      // Playback rate of Queen 
      if (playbackRate_RQ > .4) {
        redQueen_alice.getAnimation().playbackRate = speedup();
      }
      adjustBackgroundPlayback();
    }, 3000);

    // Queen speeds up if we click on Document
    document.addEventListener("click", goFaster);
    adjustBackgroundPlayback();
  });


  return (
    <div id="wrapper">
      <div className="sky">clicks on document to run background and increase speed</div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." ref={redQueen_alice.ref} />
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1Movement.ref}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2Movement.ref}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1Movement.ref}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2Movement.ref}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>


  );
}

export default App;
