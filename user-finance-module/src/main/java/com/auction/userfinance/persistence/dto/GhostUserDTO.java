package com.auction.userfinance.persistence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class GhostUserDTO {
    private Long id;
    private String name;
    private BigDecimal balance;
    private LocalDateTime lastActivity;

}
