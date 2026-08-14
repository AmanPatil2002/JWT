const [hasProfile, setHasProfile] = useState(false);
const [checkingProfile, setCheckingProfile] = useState(true);

useEffect(() => {
    checkOwnProfile();
    fetchProfiles();
}, []);

const checkOwnProfile = async () => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
        setHasProfile(false);
        setCheckingProfile(false);
        return;
    }
    try {
        const res = await axios.get(`${API_URL}/profile/profile`);
        const allProfiles = Array.isArray(res.data) ? res.data : [res.data];
        const mine = allProfiles.find(p => p.Email === userEmail);
        setHasProfile(Boolean(mine?.RegisterID));
    } catch (err) {
        console.log("Error checking own profile:", err);
        setHasProfile(false);
    } finally {
        setCheckingProfile(false);
    }
};
