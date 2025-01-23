import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises"; // Use fs/promises for async file operations
import path from "path";

export async function POST(req: Request) {
    try {
        // Get the Form Data
        const formData = await req.formData();
        const name = formData.get('name');
        const walletAddress = formData.get('walletAddress');
        const userPoints = formData.get('userPoints');
        const task = formData.get('task');

        console.log('Form Data:', name, walletAddress, userPoints, task); // Debugging log

        // Ensure all required fields are present
        if (!name || !walletAddress || !userPoints || !task) {
            return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
        }

        // Format data as a string
        const dataString = `Name: ${name}\nWallet Address: ${walletAddress}\nUser Points: ${userPoints}\nTask: ${task}\n\n`;

        // Specify the directory and file path using an absolute path
        const dirPath = path.join('./tmp');
        const filePath = path.join(dirPath, 'data.txt');

        // Ensure the directory exists
        await mkdir(dirPath, { recursive: true });

        // Append data to text file
        await appendFile(filePath, dataString);

        // Response
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: 'Failed to process form data' }, { status: 500 });
    }
}
