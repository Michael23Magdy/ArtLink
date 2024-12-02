package com.artlink.model.shapes;

import lombok.Data;
@Data
public abstract class Shape {
    private String id;
    private String fill;
    private String stroke;
    private Integer strokeWidth;
    private Integer rotation;
    private Integer x;
    private Integer y;
}
