import { useState, useMemo } from 'react';
import { calculateBox } from 'box-dimension-calculator/core';
import type { BoxInput, BoxUnit, BoxOutput } from 'box-dimension-calculator/core';

function App() {
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(15);
  const [unit, setUnit] = useState<BoxUnit>('cm');
  const [divisor, setDivisor] = useState(5000);

  const input: BoxInput = { length, width, height, unit };

  const { result, error } = useMemo<{ result: BoxOutput | null; error: string | null }>(() => {
    try {
      return { result: calculateBox(input, divisor), error: null };
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : String(e) };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, width, height, unit, divisor]);

  return (
    <div className="container">
      <header>
        <h1>📦 Box Dimension Calculator</h1>
        <p className="subtitle">
          <code>box-dimension-calculator</code> v2 — live demo
        </p>
      </header>

      <section className="card inputs">
        <h2>Dimensions</h2>

        <div className="field-row">
          <label>
            Unit
            <select value={unit} onChange={(e) => setUnit(e.target.value as BoxUnit)}>
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>
          </label>
        </div>

        {(
          [
            { label: 'Length', value: length, set: setLength },
            { label: 'Width', value: width, set: setWidth },
            { label: 'Height', value: height, set: setHeight },
          ] as const
        ).map(({ label, value, set }) => (
          <div className="field-row" key={label}>
            <label>
              {label} ({unit})
              <input
                type="number"
                min="0.01"
                step="any"
                value={value}
                onChange={(e) => set(parseFloat(e.target.value) || 0)}
              />
            </label>
            <input
              type="range"
              min="1"
              max="200"
              value={value}
              onChange={(e) => set(Number(e.target.value))}
            />
          </div>
        ))}

        <div className="field-row">
          <label>
            Divisor (dimensional weight)
            <input
              type="number"
              min="1"
              step="1"
              value={divisor}
              onChange={(e) => setDivisor(parseInt(e.target.value) || 5000)}
            />
          </label>
          <span className="hint">5000 for cm · 139 for inch</span>
        </div>
      </section>

      {error ? (
        <section className="card error">
          <h2>⚠️ Validation Error</h2>
          <p>{error}</p>
        </section>
      ) : result ? (
        <section className="card results">
          <h2>Results</h2>
          <dl>
            <dt>Volume</dt>
            <dd>
              {result.volume.toLocaleString()} {unit}³
            </dd>

            <dt>Surface Area</dt>
            <dd>
              {result.surfaceArea.toLocaleString()} {unit}²
            </dd>

            <dt>Dimensional Weight</dt>
            <dd>
              {result.dimensionalWeight.toFixed(4)} kg
            </dd>
          </dl>
        </section>
      ) : null}

      <section className="card code">
        <h2>Code</h2>
        <pre>{`import { calculateBox } from 'box-dimension-calculator';

calculateBox(${JSON.stringify(input, null, 2)});
// →
${result ? JSON.stringify(result, null, 2) : '{ ... }'}`}</pre>
      </section>

      <footer>
        <a
          href="https://github.com/shubhamAyodhyavasi/box-dimension-calculator"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        {' · '}
        <a
          href="https://www.npmjs.com/package/box-dimension-calculator"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </footer>
    </div>
  );
}

export default App;
