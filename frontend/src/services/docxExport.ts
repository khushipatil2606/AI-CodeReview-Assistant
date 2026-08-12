import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx";

interface ReviewData {
  score: number;
  bugs?: string[];
  security?: string[];
  performance?: string[];
  summary?: string;
}

export async function exportReviewDOCX(
  review: ReviewData
) {
  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      text: "AI Code Review Report",
      heading: HeadingLevel.TITLE,
    })
  );

  paragraphs.push(
    new Paragraph({
      text: `Score: ${review.score}/100`,
    })
  );

  paragraphs.push(
    new Paragraph({
      text: "Bugs",
      heading: HeadingLevel.HEADING_1,
    })
  );

  if (review.bugs && review.bugs.length > 0) {
    review.bugs.forEach((bug) => {
      paragraphs.push(
        new Paragraph({
          text: `• ${bug}`,
        })
      );
    });
  } else {
    paragraphs.push(
      new Paragraph({
        text: "No bugs found.",
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      text: "Security Issues",
      heading: HeadingLevel.HEADING_1,
    })
  );

  if (
    review.security &&
    review.security.length > 0
  ) {
    review.security.forEach((item) => {
      paragraphs.push(
        new Paragraph({
          text: `• ${item}`,
        })
      );
    });
  } else {
    paragraphs.push(
      new Paragraph({
        text: "No security issues.",
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      text: "Performance",
      heading: HeadingLevel.HEADING_1,
    })
  );

  if (
    review.performance &&
    review.performance.length > 0
  ) {
    review.performance.forEach((item) => {
      paragraphs.push(
        new Paragraph({
          text: `• ${item}`,
        })
      );
    });
  } else {
    paragraphs.push(
      new Paragraph({
        text: "No performance suggestions.",
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      text: "Summary",
      heading: HeadingLevel.HEADING_1,
    })
  );

  paragraphs.push(
    new Paragraph({
      text:
        review.summary ||
        "No summary available.",
    })
  );

  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "AI_Code_Review_Report.docx";

  link.style.display = "none";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}