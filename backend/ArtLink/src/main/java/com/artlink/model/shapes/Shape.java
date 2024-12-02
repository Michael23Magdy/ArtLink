package com.artlink.model.shapes;

import lombok.Data;
@Data
public abstract class Shape {
    private String id;
    private String fill;
    private String stroke;
    private String strokeColor;
    private String strokeWidth;
    private String rotation;
}
