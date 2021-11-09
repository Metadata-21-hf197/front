import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ManageContent from '../../components/Private/ManageContent';

function MyPage () {
    const [lists, setLists] = useState(null);

    useEffect (()=> {
        const fetchLists = async () => {
            try {
                setLists(null);
                const res = await axios.get('/mypage');
                setLists(res.data);
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchLists();
    },[]);

    return (
        <ManageContent title="유저페이지">
            <div>
                
            </div>
        </ManageContent>
    );
}

export default MyPage;