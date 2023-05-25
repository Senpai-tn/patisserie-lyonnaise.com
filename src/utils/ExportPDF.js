import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 8,
  lineSpacing = 7,
  xPosition = 10,
  initialYPosition,
  pageWrapInitialYPosition = 10,
}) {
  var textLines = doc.splitTextToSize(text, textWidth) // Split the text into lines
  var pageHeight = doc.internal.pageSize.height // Get page height, well use this for auto-paging

  var cursorY = initialYPosition
  doc.setFontSize(fontSize)
  textLines.forEach((lineText) => {
    if (cursorY > pageHeight) {
      // Auto-paging
      doc.addPage()
      var bg = new Image()
      bg.src = './newPage.png'
      doc.addImage(bg, 'png', 0, 0, 250, 300)
      cursorY = pageWrapInitialYPosition
    }

    doc.text(xPosition, cursorY, lineText)
    cursorY += lineSpacing
  })
}

const exportToPdf = (
  moduleName,
  info,
  columns,
  bodyFirstTable,
  bodySecondTable
) => {
  const doc = new jsPDF()
  console.log(bodyFirstTable)
  var bg = new Image()
  bg.src = './background.png'

  doc.addImage(bg, 'png', 0, 0, 250, 300)

  const pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
  const pageHeight =
    doc.internal.pageSize.height || doc.internal.pageSize.getHeight()

  doc.setFontSize(12)

  doc.setFontSize(10)
  doc.text(
    'Boulangerie Sainte Colombe\n86 Rue Garon,\n69560 Sainte-Colombe07 69 45 76 32',
    10,
    65
  )
  doc.setTextColor('blue')
  doc.textWithLink('Lpl69190@gmail.com', 10, 78, {
    URL: 'mailto:Lpl69190@gmail.com',
  })
  doc.setTextColor('black')
  doc.setFontSize(18)

  doc.text('FACTURE ', pageWidth - 65, 65)
  doc.setFontSize(10)
  doc.text('Date :' + info.date, pageWidth - 80, 70)
  doc.text('Numéro de facture :' + info.num_facture, pageWidth - 80, 75)
  doc.text('Adresse :' + info.adresse, pageWidth - 80, 80)
  doc.text('Code Postal et Ville :' + info.cp, pageWidth - 80, 85)
  doc.text('Numéro de téléphone :' + info.tel, pageWidth - 80, 90)
  doc.text('Email :' + info.email, pageWidth - 80, 95)
  autoTable(doc, {
    headStyles: {
      fillColor: [255, 113, 113],
      valign: 'middle',
      halign: 'center',
    },
    columns: columns,
    columnStyles: {
      0: { cellWidth: 100, halign: 'center' },
      1: { cellWidth: pageWidth / 10, halign: 'center' },
      2: { cellWidth: pageWidth / 10, halign: 'center' },
      3: { cellWidth: pageWidth / 10, halign: 'center' },
      4: { cellWidth: pageWidth / 10, halign: 'center' },
    },
    body: bodyFirstTable,
    startY: 100,
  })

  autoTable(doc, {
    columns: [
      { header: '', dataKey: 'hidden' },
      { header: '', dataKey: 'HT' },
      { header: '', dataKey: 'value' },
    ],
    columnStyles: { 0: { cellWidth: 90, fillColor: 'white' } },

    body: bodySecondTable,
  })
  addWrappedText({
    text: 'La loi n°92/1442 du 31 décembre 1992 nous fait l’obligation de vous indiquer que le non-respect des conditions de paiement entraine des intérêts de retard suivant modalités et taux défini par la loi. Une indemnité forfaitaire de 40€ sera due pour frais de recouvrement en cas de retard de paiement.\nMode de règlement :\nConditions de règlement :\nDate limite de règlement :', // Put a really long string here
    textWidth: 240,
    doc,
    // Optional
    fontSize: '8',
    fontType: 'normal',
    lineSpacing: 7, // Space between lines
    xPosition: 10, // Text offset from left of document
    initialYPosition: doc.lastAutoTable.finalY + 20, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  doc.save(`${moduleName}.pdf`)
}

export { exportToPdf }
