class Objects {
    x = 35;
    y = 35;
    img;
    height = 150;
    width = 100;
  
 


    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    setCollectablesPoint(group, index) {
        const groupSpacing =  550; // Abstand zwischen den Gruppen
        const innerGroupSpacing = 150; // Abstand zwischen den Hühnern innerhalb der Gruppe
        const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
        const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
        return baseX + offset;
    }
}