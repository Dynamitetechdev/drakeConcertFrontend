export default function handler(req, res) {
  const data = [
    {
      title: "Uploading your Document or File",
      desc: "Go to the upload page and click on the upload field to select the file you want to store on the chain, as well as the name of the file. Click on the UPLOAD button, and MetaMask will appear, prompting you to accept the gas fees. Wait for a few seconds, and your document will be uploaded to the blockchain, and a unique ID will be generated for you. Remember to keep the ID safe, as itwill allow you to access your document at any time. e.g 0x68sdgh....",
    },
    {
      title: "Verify Any Document Authenticity Using This Protocol",
      desc: "To ensure the authenticity of a document, simply enter the unique document ID on our platform and click on the VERIFY button. Our system will then cross-check whether the document ID is stored on the blockchain, providing an added layer of security and trust.",
    },
    {
      title: "Transfer document ownership",
      desc: " To transfer ownership of a document, enter the Document ID you want to transfer and the Ethereum address of the new owner and click on the TRANSFER button, MetaMask Pop up will appear,prompting you to accept the gas fees. Wait for a few seconds, and your document will be transferred to the ownership of the document will be transferred to the new address.",
    },
    {
      title: "Access your document",
      desc: "Go to the Get Document page and enter the document ID you want to view. Click on the Get Document button and the platform will display the document along with any associated files or images. If the document contains a file, you can download it by clicking the DOCUMENT FILE button. If it is an image, you'll see a preview of the document, and you can copy or download it if needed.",
    },
    {
      title: "Manage your document IDs",
      desc: "To manage your documents, click on the Your Document IDs button. You will be able to view all of your document IDs in one place, More Updates Coming on IDs Management.",
    },
    {
      title: "THANK YOU FOR CHOOSING SECURE CHAIN DOCS",
      desc: "We will continue to improve on storing and managing your valuable documents on Chain, giving you peace of mind knowing your documents are safe and easily accessible.",
    },
  ];
  res.status(200).json(data);
}
