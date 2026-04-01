import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadInvoice = async (bookingData: any) => {
  const element = document.getElementById('invoice-card'); // যে অংশটি পিডিএফ হবে
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#020617', // আপনার অ্যাপের থিম কালার
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Pouchhai_Invoice_${bookingData.id.slice(0, 8)}.pdf`);
};