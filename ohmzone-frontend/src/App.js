import React from 'react';
import RepairGuidesList from './RepairGuidesList'; // importă componenta

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>OhmZone - Ghiduri de Reparații</h1>
                <RepairGuidesList />
            </header>
        </div>
    );
}

export default App;
