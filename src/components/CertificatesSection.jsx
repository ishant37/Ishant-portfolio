
import { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Download, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";


const CERTIFICATES = [
  {
    id: "cert1",
    title: "The Complete Web Developer Bootcamp",
    issuer: "Bharat intern",
    date: "June 2023",
    image: "https://i.postimg.cc/s2S65yWH/Bharat-Intern.jpg",
    credentials: "Credential ID: ABC123456",
    url: "https://udemy.com/certificate/123456"

  },
  {
    id: "cert2",
    title: "Pyhton Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "March 2023",
    image: "https://i.postimg.cc/FH03ZKPS/Python-Essentials1-Update20250430-27-9mulz3.png",
    credentials: "Credential ID: FM-REACT-2023",
    url: "https://frontendmasters.com/certificates/123456"
  },
  {
    id: "cert3",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "December 2022",
    image: "https://i.postimg.cc/XJPr3MH3/aws.png",
    credentials: "Credential ID: AWS-DEV-2022",
    url: "https://aws.com/certificates/123456"
  },
  {
    id: "cert4",
    title: "AI for beginners",
    issuer: "HP Life",
    date: "September 2022",
    image: "https://i.postimg.cc/bvzD99SX/HP-certificate.png",
    credentials: "Credential ID: IDF-UIUX-2022",
    url: "https://interactiondesign.org/certificates/123456"
  }
];

const CertificateCard = ({ certificate, onClick }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  return (
    <div
      ref={ref}
      className={`glass-card rounded-xl overflow-hidden card-hover ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className="text-white text-sm font-medium py-1 px-3 rounded-full bg-purple-700/80">
            {certificate.issuer}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{certificate.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Issued: {certificate.date}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

const CertificatesSection = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  return (
    
    <section id="certificates" ref={sectionRef} className="mx-10 py-20 px-4 bg-white dark:bg-gray-900">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-300/30 to-blue-300/20 rounded-lg filter blur-3xl animate-pulse-light"></div>
<div className="container mx-auto max-w-5xl"></div>
  <div className={`text-center mb-16 ${isSectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
    <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Certificates & Achievements</h2>
    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Professional certifications and achievements that validate my expertise and knowledge.
    </p>
  </div>
  
  <div className="flex grid-cols-2 gap-4 md:flex md:overflow-x-auto md:space-x-4 md:pb-5 px-6 mx-8">
  {CERTIFICATES.map((certificate) => (
    <div
      key={certificate.id}
      className="w-full md:min-w-[250px] md:max-w-[250px]"
    >
      <CertificateCard
        certificate={certificate}
        onClick={() => setSelectedCertificate(certificate)}
      />
    </div>
  ))}
</div>



      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedCertificate && (
            <div>
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h3>
              <p className="text-purple-700 dark:text-purple-400 font-medium mb-4">
                {selectedCertificate.issuer}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Issue Date</span>
                  <span className="font-medium">{selectedCertificate.date}</span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Credential ID</span>
                  <span className="font-medium">{selectedCertificate.credentials.split(': ')[1]}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  onClick={() => {
                    // In a real app, link to a downloadable PDF
                    alert('Download certificate functionality would go here');
                  }}
                >
                  <Download size={18} />
                  <span>Download</span>
                </Button>
                
               
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificatesSection;
