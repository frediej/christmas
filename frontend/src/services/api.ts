// Adjust the port if you're running your backend on 5001:
const API_URL = 'http://localhost:5001/api';

//
// Messages
//
export async function fetchMessages() {
    const res = await fetch(`${API_URL}/messages`);
    return res.json();
}

export async function postMessage(sender: string, text: string) {
    const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, text }),
    });
    return res.json();
}

//
// Quotes
//
export async function fetchDailyQuote() {
    const res = await fetch(`${API_URL}/quotes/daily`);
    return res.json();
}

//
// Albums
//
export async function fetchAlbums() {
    const res = await fetch(`${API_URL}/albums`);
    return res.json();
}

export async function createAlbum(name: string) {
    const res = await fetch(`${API_URL}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    return res.json();
}

/**
 * Multiple photo upload. The "name" of the field must match
 * the "array('photos', ...)" in your backend route (albums.ts).
 */
export async function uploadPhotos(albumName: string, files: FileList) {
    const formData = new FormData();
    // Append each file
    for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
    }

    const res = await fetch(`${API_URL}/albums/${albumName}/photos`, {
        method: 'POST',
        body: formData,
    });
    return res.json();
}

//
// Spotify (optional; if you have endpoints for that)
//
export async function fetchSpotifyPlaylist(id: string) {
    const res = await fetch(`${API_URL}/spotify/playlist/${id}`);
    return res.json();
}
