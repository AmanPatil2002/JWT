import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
    Card,
    CardContent,
    Chip,
    Divider,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import BusinessIcon from '@mui/icons-material/Business';
import PaymentDialog from "./PaymentDialog";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HeightIcon from '@mui/icons-material/Height';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const API_URL = import.meta.env.VITE_API_URL;
const PREMIUM_FEE = 499;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const DisplayCard = styled(Card)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 20,
}));

const SectionTitle = ({ title }) => (
    <Typography
        variant="h5"
        sx={{
            mt: 4,
            mb: 2,
            color: "#c2185b",
            fontWeight: "bold",
        }}
    >
        {title}
    </Typography>
);

const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ mr: 2, color: '#c2185b' }}>{icon}</Box>
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
                {value || 'Not provided'}
            </Typography>
        </Box>
    </Box>
);

export default function Profile() {
    const navigate = useNavigate();

    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [date, setDate] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [language, setLanguage] = useState("");
    const [religion, setReligion] = useState("");
    const [education, setEducation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [company, setCompany] = useState("");
    const [income, setIncome] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [status, setStatus] = useState("");
    const [detail, setDetail] = useState("");
    const [physical, setPhysical] = useState("");
    const [height, setHeight] = useState("");
    const [member, setMember] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) return;
        try {
            const res = await axios.get(`${API_URL}/profile/profile`);
            const userProfile = Array.isArray(res.data)
                ? res.data.find(p => p.Email === userEmail)
                : res.data;
            if (userProfile) {
                setProfile(userProfile);
                populateForm(userProfile);
            }
        } catch (err) {
            console.log("Error fetching profile:", err);
        }
    };

    const populateForm = (profileData) => {
        setGender(profileData.Gender || "");
        setUsername(profileData.Name || "");
        setEmail(profileData.Email || "");
        setAge(profileData.Age || "");
        setDate(profileData.DOB ? profileData.DOB.split('T')[0] : "");
        setContact(profileData.Contact || "");
        setAddress(profileData.Address || "");
        setLanguage(profileData.Language || "");
        setReligion(profileData.Religion || "");
        setEducation(profileData.Education || "");
        setOccupation(profileData.Occupation || "");
        setCompany(profileData.CompanyName || "");
        setIncome(profileData.MonthlyIncome || "");
        setStatus(profileData.Status || "");
        setDetail(profileData.Detail || "");
        setPhysical(profileData.Physically || "");
        setHeight(profileData.Height || "");
        setMember(profileData.Member || "");

        if (profileData.Image) {
            setImagePreview(profileData.Image);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!gender) newErrors.gender = "Gender is required";
        if (!username.trim()) newErrors.username = "Name is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }
        if (!date) newErrors.date = "Date of birth is required";
        if (contact && !/^\d{10}$/.test(contact)) {
            newErrors.contact = "Invalid mobile number";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleMembershipChange = (e) => {
        const value = e.target.value;
        if (value === "Premium" && member !== "Premium") {
            setPaymentDialogOpen(true);
            return;
        }
        setMember(value);
    };

    const handlePremiumPaymentSuccess = () => {
        setMember("Premium");
        setPaymentDialogOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("gender", gender);
            formData.append("name", username);
            formData.append("email", email);
            formData.append("age", age);
            formData.append("dob", date);
            formData.append("contact", contact);
            formData.append("address", address);
            formData.append("language", language);
            formData.append("religion", religion);
            formData.append("education", education);
            formData.append("occupation", occupation);
            formData.append("company", company);
            formData.append("income", income);
            formData.append("status", status);
            formData.append("detail", detail);
            formData.append("physical", physical);
            formData.append("height", height);
            formData.append("member", member);

            if (image) {
                formData.append("image", image);
            }

            const isEditing = Boolean(profile?.RegisterID);
            const res = isEditing
                ? await axios.put(`${API_URL}/profile/profile/${profile.RegisterID}`, formData)
                : await axios.post(`${API_URL}/profile/profile`, formData);

            setProfile(res.data.profile);

            localStorage.setItem("name", username);
            localStorage.setItem("email", email);
            alert("Profile saved successfully!");

        } catch (err) {
            console.log(
                "Error details:",
                err.response?.data || err.message
            );
            alert(err.response?.data?.error || err.response?.data?.message || "Error saving profile");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the form?')) {
            setGender("");
            setUsername("");
            setEmail("");
            setAge("");
            setDate("");
            setContact("");
            setAddress("");
            setLanguage("");
            setReligion("");
            setEducation("");
            setOccupation("");
            setCompany("");
            setIncome("");
            setImage(null);
            setImagePreview("");
            setStatus("");
            setDetail("");
            setPhysical("");
            setHeight("");
            setMember("");
            setErrors({});
        }
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    color="error"
                    gutterBottom
                >
                    {profile ? "Edit Profile" : "Create Profile"}
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <form onSubmit={handleSubmit}>
                                <SectionTitle title="Personal Information" />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            error={!!errors.gender}
                                            helperText={errors.gender}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            error={!!errors.username}
                                            helperText={errors.username}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            error={!!errors.date}
                                            helperText="Enter your Date of Birth"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <TextField
                                            fullWidth
                                            label="Age"
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            InputProps={{
                                                inputProps: { min: 18, max: 80 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <TextField
                                            fullWidth
                                            label="Height (ft)"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            type="number"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Ft</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Marital Status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                            <MenuItem value="Widowed">Widowed</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Religion"
                                            value={religion}
                                            onChange={(e) => setReligion(e.target.value)}
                                        >
                                            <MenuItem value="Hindu">Hindu</MenuItem>
                                            <MenuItem value="Muslim">Muslim</MenuItem>
                                            <MenuItem value="Christian">Christian</MenuItem>
                                            <MenuItem value="Sikh">Sikh</MenuItem>
                                            <MenuItem value="Jain">Jain</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Mother Tongue"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            <MenuItem value="Hindi">Hindi</MenuItem>
                                            <MenuItem value="Marathi">Marathi</MenuItem>
                                            <MenuItem value="Gujarati">Gujarati</MenuItem>
                                            <MenuItem value="Tamil">Tamil</MenuItem>
                                            <MenuItem value="Telugu">Telugu</MenuItem>
                                            <MenuItem value="English">English</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <SectionTitle title="Contact Information" />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Mobile Number"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            error={!!errors.contact}
                                            helperText={errors.contact}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>

                                <SectionTitle title="Education & Career" />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Highest Education"
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                            placeholder="e.g., Bachelor's, Master's, PhD"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Occupation"
                                            value={occupation}
                                            onChange={(e) => setOccupation(e.target.value)}
                                            placeholder="e.g., Software Engineer, Doctor"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Company Name"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Monthly Income"
                                            type="number"
                                            value={income}
                                            onChange={(e) => setIncome(e.target.value)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                inputProps: { min: 0 }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <SectionTitle title="About Me" />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Write about yourself"
                                            placeholder="Describe yourself, hobbies, values, and expectations..."
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>

                                <SectionTitle title="Lifestyle & Upload" />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Physically Challenged"
                                            value={physical}
                                            onChange={(e) => setPhysical(e.target.value)}
                                        >
                                            <MenuItem value="No">No</MenuItem>
                                            <MenuItem value="Yes">Yes</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Membership"
                                            value={member}
                                            onChange={handleMembershipChange}
                                            helperText={member === "Premium" ? "Premium active" : "Upgrade unlocks premium features"}
                                        >
                                            <MenuItem value="Free">Free</MenuItem>
                                            <MenuItem value="Premium">Premium (₹{PREMIUM_FEE})</MenuItem>
                                        </TextField>

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} size={{ xs: 12 }} sx={{ padding: 2 }}>
                                    <Grid size={{ xs: 12, sm: 6 }} >
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                            fullWidth
                                            sx={{ height: 50 }}
                                        >
                                            Upload Photo
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }} >
                                        {imagePreview && (
                                            <Box sx={{ textAlign: 'center', margin: 0, }}>
                                                <img
                                                    src={imagePreview}
                                                    alt="Profile Image"
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: 180,
                                                        borderRadius: 8,
                                                        border: '2px solid #c2185b'
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                                <Box textAlign="center" mt={4} sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="error"
                                        type="submit"
                                        disabled={loading}
                                        startIcon={loading && <CircularProgress size={20} />}
                                    >
                                        {loading ? "Saving..." : "Submit Profile"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                        onClick={handleReset}
                                        disabled={loading}
                                    >
                                        Reset Form
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <DisplayCard elevation={3}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    color="error"
                                    fontWeight="bold"
                                    sx={{ textAlign: "center" }}
                                >
                                    Profile Preview
                                </Typography>

                                {profile ? (
                                    <>
                                        <Box sx={{ textAlign: 'center', mb: 2 ,}}>
                                            {profile.Image && (
                                                <img
                                                    src={profile.Image}
                                                    alt={profile.Name}
                                                    style={{
                                                        width: 150,
                                                        height: 150,
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        border: '3px solid #c2185b',
                                                        
                                                    }}
                                                />
                                            )}
                                            <Typography variant="h6" fontWeight="bold" mt={2}>
                                                {profile.Name || 'Not provided'}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1, flexWrap: 'wrap' }}>
                                                {profile.Status && <Chip label={profile.Status} size="small" color="info" />}
                                                {profile.Member === "Premium" && <Chip label="Premium" size="small" color="warning" />}
                                            </Box>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<EmailIcon />} label="Email" value={profile.Email} />
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<PhoneIcon />} label="Contact" value={profile.Contact} />
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                        <InfoRow icon={<LocationOnIcon />} label="Address" value={profile.Address} />

                                        <Divider sx={{ my: 2 }} />

                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<CalendarMonthIcon />} label="Date of Birth" value={profile.DOB ? new Date(profile.DOB).toLocaleDateString() : 'N/A'} />
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<HeightIcon />} label="Height" value={profile.Height ? `${profile.Height} ft` : 'N/A'} />
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<ArrowCircleRightIcon />} label="Religion" value={profile.Religion || 'N/A'} />
                                            </Grid>
                                             <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<ArrowCircleRightIcon />} label="Mother Tongue" value={profile.Language || 'N/A'} />
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<ArrowCircleRightIcon />} label="Age" value={profile.Age || 'N/A'} />
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <InfoRow icon={<ArrowCircleRightIcon />} label="Gender" value={profile.Gender || 'N/A'} />
                                            </Grid>
                                        </Grid>

                                        <Divider sx={{ my: 2 }} />

                                        <InfoRow icon={<SchoolIcon />} label="Education" value={profile.Education} />
                                        <Divider sx={{ my: 2 }} />
                                        <InfoRow icon={<WorkIcon />} label="Occupation" value={profile.Occupation} />
                                        <InfoRow icon={<BusinessIcon />} label="Company" value={profile.CompanyName} />
                                        <InfoRow icon={<CurrencyRupeeIcon />} label="Monthly Income" value={profile.MonthlyIncome ? `₹${profile.MonthlyIncome}` : 'N/A'} />

                                        <Divider sx={{ my: 2 }} />
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12 }}>
                                                <InfoRow icon={<SettingsAccessibilityIcon />} label="About Me" value={profile.Detail || 'No description provided'} />
                                            </Grid>
                                        </Grid>
                                        

                                        <Divider sx={{ my: 2 }} />
                                        {profile.Physically && (
                                            <Box sx={{ mt: 1 }}>
                                                <Chip
                                                    label={profile.Physically === 'Yes' ? 'Physically Challenged' : 'Not Physically Challenged'}
                                                    size="small"
                                                    color={profile.Physically === 'Yes' ? 'warning' : 'success'}
                                                />
                                            </Box>
                                        )}
                                        <Box textAlign="center" mt={4} sx={{ padding: 5 }}>
                                            {profile && (

                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="large"
                                                    sx={{ color: '#4b4453', borderColor: '#4b4453' }}
                                                    onClick={() => navigate("/match")}
                                                >
                                                    Find Your Match
                                                </Button>

                                            )}
                                        </Box>
                                    </>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                                        <PersonIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
                                        <Typography variant="h6" gutterBottom>
                                            No Profile Data
                                        </Typography>
                                        <Typography variant="body2">
                                            Fill out the form and click "Submit Profile" to see the preview
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </DisplayCard>
                    </Grid>
                </Grid>

            </Container>

            <PaymentDialog
                open={paymentDialogOpen}
                onClose={() => setPaymentDialogOpen(false)}
                onSuccess={handlePremiumPaymentSuccess}
                amount={PREMIUM_FEE}
                title="Upgrade to Premium"
                description="Unlock premium features like unlimited interests and priority visibility."
            />
        </>
    );
}
