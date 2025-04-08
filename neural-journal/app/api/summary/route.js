import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request) {
  try {
    const { entryText } = await request.json();
    const summary = await generateSummary(entryText);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return new NextResponse("Error generating summary", { status: 500 });
  }
}

async function generateSummary(text) {
  return new Promise((resolve, reject) => {
    const serveProcess = spawn("ollama", ["serve"], {
      detached: true,
      stdio: "ignore",
    });

    serveProcess.unref();

    setTimeout(() => {
      const summarizerProcess = spawn("ollama", ["run", "llama3"]);
      const prompt = "Summarize this text:\n";
      const inputText = prompt + text;

      summarizerProcess.stdin.write(`${inputText}\n`);
      summarizerProcess.stdin.end();

      let output = "";
      let errorOutput = "";

      summarizerProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      summarizerProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      summarizerProcess.on("close", (code) => {
        serveProcess.kill();

        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(errorOutput || "Unknown error");
        }
      });
    }, 2000);
  });
}
