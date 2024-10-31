import Footer from "../common/Footer";

export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
   <main>
     
     <div>
       {children}
       <Footer/>
     </div>
    
   
   </main>
  );
}