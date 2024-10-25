import axios from 'axios';

async function fetchCoordinates(address: string): Promise<{ lat: number; lng: number } | null> {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { lat, lng };
        }
        return null;
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
    }
}

export default fetchCoordinates;
