<Button
    variant="contained"
    disabled={sendingInterest || interestStatus === 'success'}
    sx={{ background: 'linear-gradient(45deg, #c2185b 30%, #e91e63 90%)' }}
    onClick={() => {
        if (!hasProfile) {
            navigate('/profile');
            return;
        }
        handleSendInterest(selectedProfile);
    }}
>
    {!hasProfile
        ? 'Create Profile First'
        : sendingInterest
            ? 'Sending...'
            : interestStatus === 'success'
                ? 'Sent'
                : 'Send Interest'}
</Button>
