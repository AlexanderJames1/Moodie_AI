export default function Footer() {
  return (
    <footer className="w-full border-border bg-background text-foreground mt-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
      
        <span className="text-center">© {new Date().getFullYear()} Moodie AI can make mistakes. Check important info.</span>
        
        <div className="flex gap-2 mr-10">
          <a href="/terms" className="hover:underline" title="Terms and Conditions">
            Terms and Privacy
          </a>
        </div>

      </div>
    </footer>
  );
}
