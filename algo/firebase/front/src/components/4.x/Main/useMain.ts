import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import residenceState from '@/lib/states/4.x/residenceState';
import applicationDocsState from '@/lib/states/4.x/applicationDocs';

const useMain = () => {
    // const [residencePrepared, setResidencePrepared] = useState(false);
    // const [residenceGlobal, setResidenceGlobal] = useRecoilState(residenceState);
    const [applicationDocsGlobal, setApplicationDocsGlobal] = useRecoilState(applicationDocsState);

    // useEffect(() => {
    //     setResidencePrepared(residenceGlobal);
    // }, [residenceGlobal]);

    // const setResidence = () => {
    //     setApplicationDocsGlobal((prevState) => ({ ...prevState, isResidenceCertificate: residencePrepared}))
    //     const currentState = residencePrepared;
    //     setResidencePrepared(!currentState);
    //     setResidenceGlobal(!currentState);
    // }

    return { applicationDocsGlobal, setApplicationDocsGlobal }
};

export default useMain;