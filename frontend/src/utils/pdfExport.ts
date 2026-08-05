import jsPDF from "jspdf";

interface ReviewData {
  score: number;
  bugs: string[];
  security: string[];
  performance: string[];
  summary: string;
}

export function exportReviewPDF(review: ReviewData) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Code Review Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`Overall Score: ${review.score}/100`, 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("Bugs", 20, y);

  y += 10;

  review.bugs.forEach((bug) => {
    doc.setFontSize(12);
    doc.text(`• ${bug}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.setFontSize(16);
  doc.text("Security", 20, y);

  y += 10;

  review.security.forEach((item) => {
    doc.setFontSize(12);
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.setFontSize(16);
  doc.text("Performance", 20, y);

  y += 10;

  review.performance.forEach((item) => {
    doc.setFontSize(12);
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.setFontSize(16);
  doc.text("Summary", 20, y);

  y += 10;

  doc.setFontSize(12);

  const summary = doc.splitTextToSize(review.summary, 170);

  doc.text(summary, 20, y);

  doc.save("AI_Code_Review_Report.pdf");
}