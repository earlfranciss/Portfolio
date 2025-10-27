export default function Footer() {
  return (
    <footer className="flex pt-8 p-4 text-sm text-gray-400 justify-between mt-9">

        <div className="italic">
            Sic Parvis Magna
        </div>
        <div>
            Earl Francis - © {new Date().getFullYear()}
        </div>    
    </footer>
  );
}
