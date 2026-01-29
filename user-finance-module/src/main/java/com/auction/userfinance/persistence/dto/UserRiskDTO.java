package com.auction.userfinance.persistence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRiskDTO {
    private String name;
    private String email;
    private String riskCategory;
}
