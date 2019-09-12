package com.pandama.picdemo.repository;

import com.pandama.picdemo.domain.Continuousdeployment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Continuousdeployment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContinuousdeploymentRepository extends JpaRepository<Continuousdeployment, Long> {

}
