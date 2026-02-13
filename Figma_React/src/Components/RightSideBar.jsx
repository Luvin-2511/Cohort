import { useContext } from "react";
import { canvasCon } from "../Context/CanvasContext";

const handleShapeProps = (e) => {
  console.log(e.target.id);
};

let handleClick;

const Section = ({ title, right }) => (
  <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-gray-300">{title}</span>
      {right}
    </div>
  </div>
);

const Input = ({ label, suffix }) => (
  <div className="bg-[#2a2a2a] rounded px-2 py-1.5 flex flex-col">
    <span className="text-[10px] uppercase text-gray-400">{label}</span>
    <div className="flex items-center gap-1">
      <input
        id={label}
        onChange={handleShapeProps}
        className="bg-transparent w-full text-sm font-medium text-gray-200 outline-none"
      />
      {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
    </div>
  </div>
);

const Btn = ({ naam, children }) => (
  <button
    id={naam}
    onClick={handleClick}
    className="w-7 h-7 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded flex items-center justify-center text-gray-300"
  >
    {children}
  </button>
);

const RightSidebar = () => {
  const {
    selectedShape,
    canvasColor,
    setCanvasColor,
    shapeProperty,
    setShapeProperty,
  } = useContext(canvasCon);

  const changeBgColor = (e) => {
    setCanvasColor(e.target.value);
  };

  handleClick = (e) => {
    console.log(shapeProperty)
  };

  return (
    <aside className="w-[320px] h-screen bg-[#1e1e1e] border-l border-[#2a2a2a] flex flex-col">
      <div className="h-12 px-4 border-b border-[#2f2f2f] flex items-center justify-between">
        <div className="flex gap-3 text-xs">
          <span className="font-semibold text-gray-200">Design</span>
          <span className="text-gray-500">Prototype</span>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1">
          100%
          <span>▾</span>
        </div>
      </div>

      {!selectedShape && (
        <div className="p-4 space-y-4 text-xs text-gray-400">
          <div className="space-y-2">
            <span className="font-semibold">Page</span>
            <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 mt-2 py-2 rounded">
              <input
                onChange={changeBgColor}
                value={canvasColor}
                type="color"
                name="bg-canvas"
                id="bg-canvas"
              />
              <label htmlFor="bg-canvas" className="">
                Canvas Background color
              </label>
            </div>
          </div>

          {["Variables", "Styles", "Export"].map((t) => (
            <div key={t} className="flex justify-between items-center py-2">
              <span className="font-semibold">{t}</span>
              <span>+</span>
            </div>
          ))}
        </div>
      )}

      {selectedShape && (
        <div className="p-4 space-y-6 text-sm overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-gray-400 rounded-sm" />
              <span className="font-semibold">Rectangle</span>
            </div>
            <div className="flex gap-2">
              <Btn>◻</Btn>
              <Btn>◯</Btn>
              <Btn>⧉</Btn>
            </div>
          </div>

          <Section title="Position" />
          <div className="space-y-3">
            <div className="flex justify-around">
              {["⟸", "⇤", "⇥", "⟹", "⇳", "⇵"].map((i) => (
                <Btn key={i}>{i}</Btn>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input label="X" />
              <Input label="Y" />
            </div>

            <div className="flex gap-2">
              <Input label="Rotation" suffix="°" />
              <Btn naam="lock">🔒</Btn>
              <Btn>⇄</Btn>
              <Btn>⇅</Btn>
            </div>
          </div>

          <Section title="Layout" />
          <div className="grid grid-cols-2 gap-2">
            <Input label="W" />
            <Input label="H" />
          </div>

          <Section
            title="Appearance"
            right={
              <div className="flex gap-2">
                <Btn>👁</Btn>
                <Btn>💧</Btn>
              </div>
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Opacity" suffix="%" />
            <Input label="Corner radius" />
          </div>

          <Section
            title="Fill"
            right={
              <div className="flex gap-2">
                <Btn>⧉</Btn>
                <Btn>+</Btn>
              </div>
            }
          />
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded bg-[#d9d9d9]" />
            <Input label="Color" />
            <Input label="Opacity" suffix="%" />
            <Btn>👁</Btn>
            <Btn>−</Btn>
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
