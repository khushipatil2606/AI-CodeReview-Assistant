import jsPDF from "jspdf";

interface ReviewData {
  score: number;
  bugs?: string[];
  security?: string[];
  performance?: string[];
  summary?: string;
}

export function exportReviewPDF(review: ReviewData) {
  try {
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    let y = 20;

    // Helper function for page overflow
    const checkPage = (requiredSpace = 15) => {
      if (y + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI Code Review Report", margin, y);

    y += 15;

    // Score
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Score: ${review.score}/100`, margin, y);

    y += 15;

    // Section helper
    const addSection = (
      title: string,
      items: string[] = []
    ) => {
      checkPage(25);

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, margin, y);

      y += 9;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);

      if (items.length === 0) {
        pdf.text("No issues found.", margin + 5, y);
        y += 8;
        return;
      }

      items.forEach((item) => {
        const text = `- ${String(item)}`;

        const lines = pdf.splitTextToSize(
          text,
          maxWidth - 5
        );

        checkPage(lines.length * 6 + 5);

        pdf.text(lines, margin + 5, y);

        y += lines.length * 6 + 3;
      });

      y += 5;
    };

    // Sections
    addSection("Strengths", []);

    addSection("Bugs", review.bugs || []);

    addSection(
      "Security Issues",
      review.security || []
    );

    addSection(
      "Performance Suggestions",
      review.performance || []
    );

    // Summary
    checkPage(30);

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Summary", margin, y);

    y += 9;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    const summary = review.summary || "No summary available.";

    const summaryLines = pdf.splitTextToSize(
      summary,
      maxWidth
    );

    summaryLines.forEach((line: string) => {
      checkPage(8);
      pdf.text(line, margin, y);
      y += 6;
    });

    // Create PDF Blob
    const pdfBlob = pdf.output("blob");

    const url = URL.createObjectURL(pdfBlob);

    // Force browser download
    const link = document.createElement("a");

    link.href = url;
    link.download = "AI_Code_Review_Report.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    console.log("PDF exported successfully.");
  } catch (error) {
    console.error("PDF export failed:", error);
    alert("Unable to generate PDF. Please check the browser console.");
  }
}