# 📱 Guide de Génération des Icônes

## 🎯 Icônes à Créer

Pour une expérience complète, vous devrez créer les icônes suivantes :

### 📋 Liste des Fichiers Nécessaires

```
public/
├── favicon.ico (32x32)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── favicon-96x96.png
```

## 🛠️ Outils Recommandés

### 1. Favicon.io (Gratuit et Simple)
- URL : https://favicon.io/
- Téléchargez votre logo au format PNG/JPG
- Génère automatiquement toutes les tailles
- Téléchargement direct de tous les fichiers

### 2. RealFaviconGenerator (Avancé)
- URL : https://realfavicongenerator.net/
- Options avancées pour différentes plateformes
- Prévisualisation sur tous les appareils
- Code HTML généré automatiquement

## 🎨 Recommandations Design

### Logo MedTours Maroc
```
✅ Fond : Bleu médical (#2563eb)
✅ Icône : Croix médicale + Cœur
✅ Style : Moderne, épuré
✅ Texte : "MT" en blanc (pour petites tailles)
```

### Couleurs Officielles
```css
Primary: #2563eb (Bleu médical)
Accent: #10b981 (Vert santé)
Background: #ffffff (Blanc)
```

## 📱 Tailles Spécifiques

| Fichier | Taille | Usage |
|---------|--------|--------|
| favicon.ico | 32x32 | Navigateur classique |
| favicon-16x16.png | 16x16 | Onglets navigateur |
| favicon-32x32.png | 32x32 | Signets navigateur |
| apple-touch-icon.png | 180x180 | iOS Safari |
| android-chrome-192x192.png | 192x192 | Android Chrome |
| android-chrome-512x512.png | 512x512 | PWA Android |

## 🚀 Installation Rapide

1. **Créer le logo principal** (512x512 minimum)
2. **Aller sur favicon.io**
3. **Télécharger le pack complet**
4. **Remplacer dans `/public/`**
5. **Tester sur différents appareils**

## ✅ Vérification

Après installation, vérifiez :
- [ ] Favicon visible dans l'onglet
- [ ] Icône correcte lors d'ajout aux favoris
- [ ] Affichage parfait sur mobile
- [ ] PWA installable avec bonne icône

---

**Note :** Le site fonctionne parfaitement sans ces icônes, mais elles améliorent l'expérience utilisateur professionnelle.