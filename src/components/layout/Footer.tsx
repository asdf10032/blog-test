import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-muted">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>© 2026 阿斯蒂芬的平行世界</p>
        <p className="text-xs">秩序中的混沌 · Chaos in Order</p>
      </Container>
    </footer>
  );
}
