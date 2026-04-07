export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div>
            <div className="footer__brand-text">
              <span className="mark">N</span>
              nosVemos
            </div>
            <p className="footer__tagline">
              Invitaciones digitales elegantes para los momentos que merecen ser recordados.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <p className="footer__col-title">Plantillas</p>
            <ul className="footer__links">
              <li><a href="#">Bodas</a></li>
              <li><a href="#">Quinceañeras</a></li>
              <li><a href="#">Fiestas</a></li>
              <li><a href="#">Corporativos</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="footer__col-title">Empresa</p>
            <ul className="footer__links">
              <li><a href="#">Cómo Funciona</a></li>
              <li><a href="#">Precios</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <p className="footer__col-title">Legal</p>
            <ul className="footer__links">
              <li><a href="#">Términos de Uso</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2025 <span>nosVemos</span> · Hecho con ♥ en México
          </p>

          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Instagram">
              IG
            </a>
            <a href="#" className="footer__social-link" aria-label="Facebook">
              FB
            </a>
            <a href="#" className="footer__social-link" aria-label="WhatsApp">
              WA
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
