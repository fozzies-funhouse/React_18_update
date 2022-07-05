import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import Shoe from './3dShoe';
import React from 'react';

export default function Picker(props) {
  const { state } = props;
  const snap = useSnapshot(state);
  console.log('state items', state.items);
  return (
    <div style={{ display: snap.current ? 'block' : 'none' }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[snap.current] = color)}
      />
      <h1>{snap.current}</h1>
    </div>
  );
}
