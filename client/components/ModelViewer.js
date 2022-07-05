// function ModelViewer() {
//   const [modelGLB, setModelGLB] = useState(jsonMock.linksGLB[0]);
//   const [modelUSDZ, setModelUSDZ] = useState(jsonMock.linksUSDZ[0]);

//   const onSelectModel = (glb, usdz) => {
//     setModelGLB(glb);
//     setModelUSDZ(usdz);
//   };

//   return (
//     <Fragment>
//       <model-viewer
//         ar
//         modes="scene-viewer quick-look webxr"
//         src={'../../ShoeTest/shoe.glb'} // AR Android/Web
//         ios-src={modelUSDZ} // AR iOS
//         auto-rotate
//         camera-controls
//         style={{ width: '100vw', height: '90vh' }}
//       >
//         <div>
//           {jsonMock.linksGLB.map((link, index) => {
//             return (
//               <div
//                 key={index}
//                 showLabel={true}
//                 label={`model ${index + 1}`}
//                 icon={<div />}
//                 onClick={() =>
//                   onSelectModel(
//                     jsonMock.linksGLB[index],
//                     jsonMock.linksUSDZ[index]
//                   )
//                 }
//               />
//             );
//           })}
//           {/* <button slot="ar-button">
//         <BottomNavigationAction
//           showLabel={true}
//           label="View AR"
//           icon={<AddAPhoto />}
//         />
//       </button> */}
//         </div>
//       </model-viewer>
//     </Fragment>
//   );
// }
