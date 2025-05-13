import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

export default function AdminGuidesPage() {
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        api.get('/repairguide')
            .then(res => setGuides(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Admin: Repair Guides</h1>
            <ul>
                {guides.map(g => (
                    <li key={g.guideID} className="mb-2">
                        {g.title}{' '}
                        <Link to={`/admin/guides/${g.guideID}/edit`} className="text-blue-500">
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
