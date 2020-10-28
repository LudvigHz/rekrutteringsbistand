import React, { FunctionComponent, useState } from 'react';
import Microfrontend from './microfrontend/Microfrontend';
import MocketMicrofrontend from './microfrontend/mock/MocketMicrofrontend';

const erProd = process.env.NODE_ENV === 'production';
const importerMicrofrontends = process.env.REACT_APP_IMPORT || erProd;

const ChildApp = importerMicrofrontends ? Microfrontend : MocketMicrofrontend;

const App: FunctionComponent = () => {
    const [visning, setVisning] = useState<number>(1);
    const [teller, setTeller] = useState<number>(0);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Rekrutteringsbistand-container</h1>
            </header>
            <nav>
                <button onClick={() => setVisning(1)}>Statistikk</button>
                <button onClick={() => setVisning(2)}>Kandidat</button>
            </nav>
            <main>
                <button onClick={() => setTeller(teller - 1)}>Tell ned</button>
                <button onClick={() => setTeller(teller + 1)}>Tell opp</button>
                {visning === 1 && (
                    <ChildApp
                        appName="rekrutteringsbistand-statistikk"
                        appPath="/statistikk"
                        appProps={{
                            hilsen: `Hei fra rekrutteringsbistand-statistikk! Teller er på ${teller}`,
                        }}
                    />
                )}
                {visning === 2 && (
                    <ChildApp
                        appName="rekrutteringsbistand-kandidat"
                        appPath="/kandidater"
                        appProps={{
                            hilsen: `Hei fra rekrutteringsbistand-kandidat! Teller er på ${teller}`,
                        }}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
