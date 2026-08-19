const Addintrest = async (profile) => {
    if (!intrested) return;

    setLoading(true);

    try {
        const res = await axios.put(
            `${API_URL}/user/intrest/${encodeURIComponent(currentUserEmail)}`,
            {
                intrest: intrested,
                requesterEmail: currentUserEmail,
                profileId: profile.RegisterID,
            }
        );

        console.log("Interest updated:", res.data);
        setIntrested("");

    } catch (err) {
        console.error(
            "Error updating interest:",
            err.response?.data || err.message
        );
    } finally {
        setLoading(false);
    }
};
