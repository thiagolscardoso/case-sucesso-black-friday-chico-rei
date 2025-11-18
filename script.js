// ==================== Animação de Números ====================
// Anima os valores dos KPIs quando entram na viewport

const animateNumbers = () => {
    const kpiValues = document.querySelectorAll('.kpi-value, .result-metric');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent.trim();
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const hasPercent = finalValue.includes('%');
                const hasPlus = finalValue.includes('+');
                
                let currentValue = 0;
                const increment = Math.ceil(numericValue / 30);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(counter);
                    }
                    
                    let displayValue = currentValue.toString();
                    if (hasPlus) displayValue = '+' + displayValue;
                    if (hasPercent) displayValue = displayValue + '%';
                    
                    element.textContent = displayValue;
                }, 30);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    kpiValues.forEach(value => observer.observe(value));
};

// ==================== Animação de Barras de Progresso ====================
// Anima as barras de participação quando entram na viewport

const animateProgressBars = () => {
    const barSegments = document.querySelectorAll('.bar-segment');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const width = element.style.width;
                element.style.width = '0';
                
                setTimeout(() => {
                    element.style.width = width;
                }, 100);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    barSegments.forEach(bar => observer.observe(bar));
};

// ==================== Scroll Suave ====================
// Adiciona comportamento de scroll suave para links internos

const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ==================== Efeito de Hover em Cards ====================
// Adiciona efeito visual ao passar o mouse sobre os cards

const addCardHoverEffects = () => {
    const cards = document.querySelectorAll('.kpi-card, .result-item, .metric-highlight');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
};

// ==================== Detecção de Modo Escuro ====================
// Verifica se o usuário prefere modo escuro

const checkDarkMode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Usuário prefere modo escuro
    }
};

// ==================== Compartilhamento Social ====================
// Função para compartilhar o dashboard

const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = 'Case Chico Rei & Thiago Luz - Crescimento de 174% em Receita';
    const text = 'Confira os resultados impressionantes da campanha Performance Max: 174% de crescimento na receita do Google Ads!';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        default:
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copiado para a área de transferência!');
            });
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};

// ==================== Impressão do Dashboard ====================
// Função para imprimir o dashboard

const printDashboard = () => {
    window.print();
};

// ==================== Inicialização ====================
// Executa todas as funções quando o DOM está pronto

document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    animateProgressBars();
    smoothScroll();
    addCardHoverEffects();
    checkDarkMode();
});

// ==================== Scroll Listener ====================
// Adiciona classe ao header quando o usuário faz scroll

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Redimensionamento de Janela ====================
// Reajusta o layout quando a janela é redimensionada

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        animateNumbers();
        animateProgressBars();
    }, 250);
});

// ==================== Acessibilidade ====================
// Melhora a acessibilidade do dashboard

const improveAccessibility = () => {
    document.querySelectorAll('.kpi-card').forEach((card, index) => {
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', `Métrica ${index + 1}`);
    });
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #1e40af';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
};

window.addEventListener('load', improveAccessibility);

// ==================== Suporte a Teclado ====================
// Adiciona suporte para navegação por teclado

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P para imprimir
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printDashboard();
    }
    
    // Ctrl/Cmd + S para salvar (evita comportamento padrão)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
    }
});

console.log('Dashboard Chico Rei & Thiago Luz carregado com sucesso!');
