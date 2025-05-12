document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const audioFile = document.getElementById("audioFile");
    const fileNameDisplayContainer = document.getElementById("fileNameDisplayContainer");
    const fileNameDisplay = document.getElementById("fileNameDisplay");
    const cleanButton = document.getElementById("cleanButton");
    const buttonText = document.getElementById("buttonText");
    const loaderIcon = document.getElementById("loaderIcon");

    const originalPlayer = document.getElementById("originalPlayer");
    const cleanedPlayer = document.getElementById("cleanedPlayer");
    const downloadLink = document.getElementById("downloadLink");

    const waveformOriginalEl = document.getElementById("waveform-original");
    const waveformCleanedEl = document.getElementById("waveform-cleaned");
    const waveformCleanedSkeleton = document.getElementById("waveform-cleaned-skeleton");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastDownloadLink = document.getElementById("toastDownloadLink");

    let originalWaveSurfer = null;
    let cleanedWaveSurfer = null;
    let uploadedFile = null;

    // Initialize WaveSurfers with artistic options
    const waveSurferOptions = (container) => ({
        container: container,
        waveColor: "rgba(233, 69, 96, 0.7)", // Artistic pink
        progressColor: "#f9c549", // Artistic gold
        cursorColor: "#ffffff",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 80, // Slightly reduced height for the new layout
        normalize: true,
        hideScrollbar: true,
    });

    if (waveformOriginalEl) {
        originalWaveSurfer = WaveSurfer.create(waveSurferOptions(waveformOriginalEl));
    }
    if (waveformCleanedEl) {
        cleanedWaveSurfer = WaveSurfer.create(waveSurferOptions(waveformCleanedEl));
    }

    dropZone.addEventListener("click", () => audioFile.click());
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-pink-500", "bg-pink-500/[.08]");
    });
    dropZone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-pink-500", "bg-pink-500/[.08]");
    });
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-pink-500", "bg-pink-500/[.08]");
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    audioFile.addEventListener("change", (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        uploadedFile = file;
        fileNameDisplay.textContent = file.name;
        fileNameDisplayContainer.classList.remove("hidden");
        originalPlayer.classList.remove("hidden");
        originalPlayer.src = URL.createObjectURL(file);
        if (originalWaveSurfer) {
            originalWaveSurfer.load(originalPlayer.src);
        }
        cleanButton.disabled = false;
        // Reset cleaned audio section
        cleanedPlayer.classList.add("hidden");
        downloadLink.classList.add("hidden");
        if (cleanedWaveSurfer) cleanedWaveSurfer.empty();
        waveformCleanedEl.classList.add("hidden");
        waveformCleanedSkeleton.classList.add("hidden");
    }

    cleanButton.addEventListener("click", async () => {
        if (!uploadedFile) {
            showToast("Please upload an audio file first.", true);
            return;
        }

        buttonText.textContent = "Sculpting...";
        loaderIcon.classList.remove("hidden");
        cleanButton.disabled = true;

        waveformCleanedEl.classList.add("hidden");
        waveformCleanedSkeleton.classList.remove("hidden");

        const formData = new FormData();
        formData.append("audio", uploadedFile);

        try {
            // Simulate API call delay for artistic effect
            await new Promise(resolve => setTimeout(resolve, 2500)); 

            // **Simulated** API response for serverless/dynamic with simulation
            // In a real dynamic setup, this would be: `const response = await fetch("/clean-audio", { method: "POST", body: formData });`
            // And then: `if (!response.ok) throw new Error("Cleaning failed artistically!");`
            // `const blob = await response.blob();`
            
            // Simulate a cleaned audio blob (e.g., by slightly modifying the original or using a placeholder)
            // For this demo, we'll just re-use the original file as a placeholder for the "cleaned" version.
            const blob = uploadedFile; 
            const cleanedAudioURL = URL.createObjectURL(blob);

            cleanedPlayer.src = cleanedAudioURL;
            cleanedPlayer.classList.remove("hidden");
            if (cleanedWaveSurfer) {
                cleanedWaveSurfer.load(cleanedAudioURL);
            }
            downloadLink.href = cleanedAudioURL;
            downloadLink.download = `SAFI_Art_${uploadedFile.name}`;
            downloadLink.classList.remove("hidden");
            
            waveformCleanedSkeleton.classList.add("hidden");
            waveformCleanedEl.classList.remove("hidden");

            showToast(`"${uploadedFile.name}" has been artistically sculpted!`, false, cleanedAudioURL, `SAFI_Art_${uploadedFile.name}`);

        } catch (error) {
            console.error("Error during artistic sculpting:", error);
            showToast("An unexpected brushstroke occurred. Please try again.", true);
        } finally {
            buttonText.textContent = "Sculpt Audio";
            loaderIcon.classList.add("hidden");
            cleanButton.disabled = false;
        }
    });

    function showToast(message, isError = false, downloadUrl = null, downloadName = null) {
        toastMessage.textContent = message;
        if (isError) {
            toast.classList.remove("from-pink-500", "to-purple-600");
            toast.classList.add("from-red-500", "to-red-700");
            toastDownloadLink.classList.add("hidden");
        } else {
            toast.classList.remove("from-red-500", "to-red-700");
            toast.classList.add("from-pink-500", "to-purple-600");
            if (downloadUrl) {
                toastDownloadLink.href = downloadUrl;
                toastDownloadLink.download = downloadName;
                toastDownloadLink.classList.remove("hidden");
            } else {
                toastDownloadLink.classList.add("hidden");
            }
        }
        toast.classList.remove("hidden");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 5000);
    }
});
