import { jsPDF } from "jspdf";

// function to check if all required fields are filled
export const areAllFieldsFilled = (formData) => {
  // List of fields to check (exclude file inputs)
  const requiredFields = [
    "last_name",
    "given_name",
    "middle_name",
    "age",
    "date_of_birth",
    "place_of_birth",
    "course",
    "year_level",
    "contact_number",
    "email_address",
    "sex",
    "civil_service",
    "religion",
    "height",
    "weight",
    "address",
    "number_family_members",
    "ethnicity",
    "father_name",
    "father_occupation",
    "father_address",
    "father_number",
    "mother_name",
    "mother_occupation",
    "mother_address",
    "mother_number",
    "elementary_school",
    "elementary_awards",
    "elementary_year",
    "secondary_school",
    "secondary_awards",
    "secondary_year",
    "availed_scholarship",
    "scholarship_year",
    "scholarship_name",
  ];

  // Check if any required field is empty
  for (const field of requiredFields) {
    if (!formData[field]) {
      return false;
    }
  }

  return true;
};

// Generate PDF
export const generatePDF = async (
  formData,
  filename = "scholarship-application.pdf"
) => {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // font sizes
    const titleSize = 16;
    const headingSize = 14;
    const normalSize = 10;
    const smallSize = 8;

    // margins and positions
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - margin * 2;
    let yPos = margin;

    // add text with word wrap
    const addWrappedText = (text, x, y, maxWidth, fontSize, align = "left") => {
      pdf.setFontSize(fontSize);

      // Split the text into words
      const words = text.split(" ");
      let line = "";
      let testLine = "";
      let lineArray = [];

      // if the words fit on the line
      for (let i = 0; i < words.length; i++) {
        testLine += words[i] + " ";
        const testWidth =
          (pdf.getStringUnitWidth(testLine) * fontSize) /
          pdf.internal.scaleFactor;

        if (testWidth > maxWidth) {
          lineArray.push(line);
          line = words[i] + " ";
          testLine = words[i] + " ";
        } else {
          line = testLine;
        }
      }

      if (line != "") {
        lineArray.push(line);
      }

      // Print the lines
      for (let i = 0; i < lineArray.length; i++) {
        if (align === "center") {
          pdf.text(lineArray[i].trim(), x + maxWidth / 2, y, {
            align: "center",
          });
        } else if (align === "right") {
          pdf.text(lineArray[i].trim(), x + maxWidth, y, { align: "right" });
        } else {
          pdf.text(lineArray[i].trim(), x, y);
        }
        y += fontSize * 0.5;
      }

      return y;
    };

    // Add a section with a heading
    const addSection = (title, content, startY) => {
      let y = startY;

      // Add section title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(headingSize);
      pdf.text(title, margin, y);
      y += 8;

      // Add horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 5;

      // Add content
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(normalSize);

      for (const item of content) {
        if (y > 270) {
          pdf.addPage();
          y = margin;
        }

        if (typeof item === "string") {
          y = addWrappedText(item, margin, y, contentWidth, normalSize);
          y += 5;
        } else if (typeof item === "object") {
          if (item.type === "field") {
            pdf.setFont("helvetica", "bold");
            pdf.text(`${item.label}: `, margin, y);
            const labelWidth =
              (pdf.getStringUnitWidth(`${item.label}: `) * normalSize) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            y = addWrappedText(
              item.value || "N/A",
              margin + labelWidth,
              y,
              contentWidth - labelWidth,
              normalSize
            );
            y += 5;
          } else if (item.type === "columns") {
            const colWidth = contentWidth / item.columns.length;
            let maxColHeight = 0;

            // Calculate the maximum height of all columns
            for (let i = 0; i < item.columns.length; i++) {
              const col = item.columns[i];
              let colY = y;

              for (const field of col) {
                pdf.setFont("helvetica", "bold");
                pdf.text(`${field.label}: `, margin + i * colWidth, colY);
                const labelWidth =
                  (pdf.getStringUnitWidth(`${field.label}: `) * normalSize) /
                  pdf.internal.scaleFactor;
                pdf.setFont("helvetica", "normal");
                colY = addWrappedText(
                  field.value || "N/A",
                  margin + i * colWidth + labelWidth,
                  colY,
                  colWidth - labelWidth - 5,
                  normalSize
                );
                colY += 5;
              }

              const colHeight = colY - y;
              if (colHeight > maxColHeight) {
                maxColHeight = colHeight;
              }
            }

            y += maxColHeight;
          }
        }
      }

      return y;
    };

    // Add title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(titleSize);
    pdf.text("SCHOLARSHIP APPLICATION FORM", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 10;

    // Add applicant name
    pdf.setFontSize(headingSize);
    const fullName = `${formData.last_name}, ${formData.given_name} ${formData.middle_name}`;
    pdf.text(fullName, pageWidth / 2, yPos, { align: "center" });
    yPos += 15;

    // Personal Information Section
    const personalInfo = [
      {
        type: "columns",
        columns: [
          [
            { label: "Age", value: formData.age },
            { label: "Sex", value: formData.sex },
            { label: "Civil Service", value: formData.civil_service },
            { label: "Religion", value: formData.religion },
          ],
          [
            {
              label: "Date of Birth",
              value: formatDate(formData.date_of_birth),
            },
            { label: "Place of Birth", value: formData.place_of_birth },
            { label: "Height", value: formData.height },
            { label: "Weight", value: `${formData.weight} kg` },
          ],
        ],
      },
      { type: "field", label: "Address", value: formData.address },
      {
        type: "field",
        label: "Contact Number",
        value: formData.contact_number,
      },
      { type: "field", label: "Email Address", value: formData.email_address },
      { type: "field", label: "Ethnicity", value: formData.ethnicity },
      {
        type: "field",
        label: "Number of Family Members",
        value: formData.number_family_members,
      },
    ];

    yPos = addSection("PERSONAL INFORMATION", personalInfo, yPos);
    yPos += 10;

    // Educational Information Section
    const educationalInfo = [
      {
        type: "columns",
        columns: [
          [
            { label: "Course", value: formData.course },
            { label: "Year Level", value: formData.year_level },
          ],
        ],
      },
      {
        type: "columns",
        columns: [
          [
            { label: "Elementary School", value: formData.elementary_school },
            { label: "Elementary Year", value: formData.elementary_year },
          ],
          [{ label: "Elementary Awards", value: formData.elementary_awards }],
        ],
      },
      {
        type: "columns",
        columns: [
          [
            { label: "High School", value: formData.secondary_school },
            { label: "High School Year", value: formData.secondary_year },
          ],
          [{ label: "High School Awards", value: formData.secondary_awards }],
        ],
      },
      {
        type: "field",
        label: "Previous Scholarship",
        value: formData.availed_scholarship,
      },
      {
        type: "field",
        label: "Scholarship Year",
        value: formData.scholarship_year,
      },
      {
        type: "field",
        label: "Scholarship Name",
        value: formData.scholarship_name,
      },
    ];

    if (yPos > 200) {
      pdf.addPage();
      yPos = margin;
    }

    yPos = addSection("EDUCATIONAL INFORMATION", educationalInfo, yPos);
    yPos += 10;

    // Family Information Section
    const familyInfo = [
      {
        type: "columns",
        columns: [
          [
            { label: "Father's Name", value: formData.father_name },
            { label: "Father's Occupation", value: formData.father_occupation },
            { label: "Father's Address", value: formData.father_address },
            { label: "Father's Contact", value: formData.father_number },
          ],
          [
            { label: "Mother's Name", value: formData.mother_name },
            { label: "Mother's Occupation", value: formData.mother_occupation },
            { label: "Mother's Address", value: formData.mother_address },
            { label: "Mother's Contact", value: formData.mother_number },
          ],
        ],
      },
    ];

    if (yPos > 200) {
      pdf.addPage();
      yPos = margin;
    }

    yPos = addSection("FAMILY INFORMATION", familyInfo, yPos);
    yPos += 20;

    // Add footer
    pdf.setFontSize(smallSize);
    pdf.setFont("helvetica", "italic");
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      285,
      { align: "center" }
    );

    // Save the PDF
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

// format date
const formatDate = (dateString) => {
  if (!dateString) return "Not provided";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (e) {
    return dateString;
  }
};