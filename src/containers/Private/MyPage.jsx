import axios from 'axios';
import React, { useEffect, useState } from 'react';


function MyPage () {
    const [list, setLists] = useState(null);

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
        <div>
            <p>마이페이지</p>
        </div>
    );
}

export default MyPage;