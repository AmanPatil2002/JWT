const handleSendInterest = async (profile) => {
    if (!hasProfile) {
        setInterestStatus('no-profile');
        return;
    }

    if (!currentUserEmail) {
        setInterestStatus('error');
        console.error("Current user email not found");
        return;
    }
    // ...rest stays the same
