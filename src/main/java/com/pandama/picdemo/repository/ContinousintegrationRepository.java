package com.pandama.picdemo.repository;

import com.pandama.picdemo.domain.Continousintegration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Continousintegration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContinousintegrationRepository extends JpaRepository<Continousintegration, Long> {

}
