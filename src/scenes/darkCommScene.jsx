import Spline from '@splinetool/react-spline';

const DarkCommScene = () => {

  const canvasStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
  };

  return (
    <Spline 
      scene="https://prod.spline.design/x2sv2t2U-ZC9pXTe/scene.splinecode"
      style={canvasStyles}
    />
  );
}

export default DarkCommScene; 
