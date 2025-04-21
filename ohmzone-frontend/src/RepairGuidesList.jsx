import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RepairGuidesList() {
    const [repairGuides, setRepairGuides] = useState([]);

    useEffect(() => {
        // Fă cererea GET la API pentru a obține ghidurile de reparații
        axios.get('http://localhost:5000/api/RepairGuide') // URL-ul API-ului
            .then(response => {
                setRepairGuides(response.data);
            })
            .catch(error => {
                console.error('A apărut o eroare la încărcarea ghidurilor de reparații:', error);
            });
    }, []);

    return (
        <div>
            <h1>Ghiduri de Reparații</h1>
            <ul>
                {repairGuides.map(guide => (
                    <li key={guide.id}>
                        <h3>{guide.title}</h3>
                        <p>{guide.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepairGuidesList;
