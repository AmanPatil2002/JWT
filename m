<Button
    variant="contained"
    fullWidth
    disabled={
        isSending ||
        interestStatus === 'success' ||
        interestStatus === 'already-sent'
    }
    sx={{
        minWidth: { sm: 160 },
        background: 'linear-gradient(45deg, #c2185b 30%, #e91e63 90%)',
        '&.Mui-disabled': {
            background:
                interestStatus === 'already-sent' || interestStatus === 'success'
                    ? '#e0e0e0'
                    : undefined,
            color:
                interestStatus === 'already-sent' || interestStatus === 'success'
                    ? '#9e9e9e'
                    : undefined,
            cursor: 'not-allowed',
            pointerEvents: 'auto', // keeps cursor style visible even though clicks are blocked
        },
    }}
    onClick={() => {
        if (interestStatus === 'already-sent' || interestStatus === 'success') {
            return; // guard: no-op even if disabled were ever bypassed
        }
        if (!hasProfile) {
            navigate('/profile');
            return;
        }
        handleSendInterest(selectedProfile);
    }}
>
    {!hasProfile
        ? 'Create Profile'
        : isSending
            ? 'Sending...'
            : interestStatus === 'success'
                ? 'Sent'
                : interestStatus === 'already-sent'
                    ? 'Already Sent'
                    : 'Send Interest'}
</Button>
